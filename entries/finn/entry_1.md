# **FINN, entry \#1: from two hoverboard motors to a research platform**

The robot balances in simulation. It has yet to balance in my apartment.

Status as of posting: the frame is up, the power system is live, and both motors are calibrated. The first couple of sysid passes are done and there’s an LQR controller holding the model upright in sim. On the actual robot nothing has balanced; getting it balanced is the next entry.

*Photo: photos/full-robot-gantry-supported.jpeg*

What exists right now is the main frame of the robot that has to stay upright before a head or arms or a torso can sit on top of it. A few months ago it was just two hoverboard motors on my apartment floor.

*Photo: photos/original-hoverboard.jpeg*

Brushless, surprisingly torquey, and effectively free, because owning a hoverboard was briefly something everyone did about ten years ago and now they're all sitting in closets and garages. I looked at them for a while and couldn't think of anything to do with them except build a self-balancing robot. 

## **What FINN is**

A self-balancing, two-wheeled humanoid I'm building from scratch.

The name comes from an old Germanic root meaning "to find." I'd like to claim that was a considered decision about a robot learning to find its footing, but the real reason is that it's cute and warm, which turns out to be a useful quality in a name when you're asking your fiancée to accept a meter-tall inverted pendulum in the living room.

This is entry \#1 of a running notebook. FINN is a learning platform. I'm using it to force myself through the whole stack in order: power, motor control, dynamics, state estimation, control theory, simulation, and later on perception, manipulation, and policy. The goal is a physical robot of course but I care more about there being a legible record of how it got there. That record: Firmware, CAD, electrical docs, sim models, identification data, controllers, and logs all go up as I write them.

**Why wheels**

Legs would eat most of the budget and most of the calendar before I got anywhere near manipulation or interaction. Wheels let me skip foot design, contact planning, impact dynamics, and gait.

What they don't let me skip is the underactuated control problem, which is good, because to me that's the interesting half. FINN still has to hold pitch while it drives, while it turns, and eventually while the arms and head are doing something else entirely. Whole-body coupling on a body that falls over the moment you stop paying attention to it, with enough money left over to actually build the arms.

Bracketbot has been doing good work in this form factor, and their cheap-and-capable thing is a lot of why I stopped considering legs and what inspired a bit of the form factor I went with.

## **The frame**

4040 aluminum extrusion. Roughly 50 cm across the base, 100 cm mast for now.

T-slot is heavy for what it is. A purpose-built frame would weigh less. But it's cheap, and I can move a component 40 mm up the mast in ten minutes instead of redrawing a plate, sending it to sendcutsend, and waiting a week, which matters enormously right now because the mass and its dynamics are ever changing.

The mast is tall on purpose. In an idealized inverted pendulum, raising the center of mass slows the open-loop pitch dynamics. The robot still falls over, it just falls lazily, and the controller gets more time to do something about it.

That's the textbook version. Height also changes the body inertia, puts more potential energy into every fall, gives the structure more room to flex, and depending on how the mass ends up distributed may cost more corrective torque for the same pitch error. So mast height isn't a set decision I've made. It's a knob. Same with the battery, which sits partway up the mast so I can slide it during testing and watch what happens to the recovery envelope. Where it all finally lands depends on the head, the arms, the torso wiring, and whatever the onboard compute weighs; all of that is further down the road so the adjustability works best right now. 

One constraint I do want to hold onto: the head should end up right below eye level for most adults. I want FINN to feel present in a room without standing over anyone in it.

The look is deliberate too. I like machines that don't hide what they are, and I take a lot from Japanese industrial design and companies like Teenage Engineering, Sony, Nikon, Fanuc. Visible fasteners, exposed extrusion, parts you can point at and reason about. A robot that's obviously a robot, operating in a world that was built for people.

## **Moteus, and low-speed torque**

Each hub motor runs off a Moteus r4.11 from mjbots. Shout out to Josh Pieper for that whole ecosystem.

*Photo: photos/moteus-base-frame-view.jpeg*

Most cheap hoverboard controllers infer rotor position from back-EMF, which works fine once the wheel is already spinning. FINN spends most of its life in the opposite regime, throwing small torque commands that reverse sign constantly at basically zero wheel velocity (bar actual navigation, we’re just talking about balancing right now). Moteus gives me sensored field-oriented control, so the torque interface stays relatively clean around standstill.

Which fixes the controller and not the sensors. The integrated Halls give coarse rotor position, their transition spacing isn't perfectly even, and the resolution is bad next to any real encoder. Moteus has logic that improves Hall operation at low speed, and it's still a compromise.

I think it's survivable, because what the wheels need is reliable torque regulation and not precise joint positioning. If torque ripple or near-zero velocity estimation turns out to be the thing limiting the controller I’ll probably switch off hoverboard motors or onto something newer that I can slap an encoder on rather than working off hall effects. I don't want to redesign the actuators because they look bad on paper. I also don't want to keep them out of sentiment once the data says they're the bottleneck.

Both boards sit on one CAN-FD bus, 120 ohm termination at each physical end, running up to an Adafruit CAN-PAL breakout that talks to the brain.

## **The brain**

People keep asking why the controller isn't a Pi or a Jetson.

Mostly because a Teensy is a much smaller thing for me to make deterministic and then actually verify. 600 MHz, microcontroller timing I can reason about, and far more compute than the inner loop needs.

The bigger reason for this is isolation. A perception process or a policy that hangs cannot be allowed to take the balance controller with it. Teensy owns the fast balancing loop and the safety around that path. A Jetson Orin Nano will eventually own perception, mapping, policy inference, logging, and anything resembling behavior. If that side locks up, FINN should still be able to stand there and/or shut itself down cleanly.

*Photo: SPLITVIEW \- drawings/wiring-harness-drawing.pdf AND photos/brain-off-robot.jpeg*

That breakout is a TJA051 transceiver, soldered together because I didn't want to wait for the right connectors to show up, and I fully expect that to bite me. CAN-FD rather than classic CAN because Moteus supports the faster data phase and the larger frames, and I want low-latency command and telemetry.

The IMU is a BNO085 over I2C. For the first controller I'm running its six-axis Game Rotation Vector, so accelerometer and gyro fused with no magnetometer input. The magnetometer is sitting a few inches from two hub motors, their phase wiring, and currents that change every millisecond, so I don't believe anything it would tell me about heading would be useful. The IMU itself is mounted rigidly near the wheel axle, which cuts down some of the linear acceleration you pick up from body rotation and keeps the sensor transform simple enough.

Here's the thing I didn’t realize at first so I'll note it here. A smooth quaternion is not automatically a good control signal. Filtering adds delay, and delay comes directly out of the stability margin. The BNO08x will give you the fused Game Rotation Vector at up to 400 Hz, and the lower-latency Gyro Rotation Vector at up to 1 kHz. A 1 kHz control loop cannot go around assuming every iteration contains a fresh fused orientation measurement.

So the estimator and the controller are a multi-rate system whether or not I design for that. I need real numbers for update rate, timestamps, jitter, and latency instead of the datasheet's opinion of them. I'm logging the fused estimate alongside the lower-level sensor outputs so I can put the onboard fusion next to a complementary filter and see which one I'd rather have. My guess is that predictable phase delay beats a pretty orientation trace. I don't have the measurements to say that yet, so it's a guess I'm writing down here mostly so I can be embarrassed by it later.

## **Power**

*Photo: battery-view.jpg*

The first motor tests ran off a 24V switching supply at the end of about 20 feet of cable. I knew that was dumb while I was doing it.

A decelerating BLDC is effectively a generator. It's the same principle behind regenerative braking in electric bikes and vehicles. It shoves energy back onto the DC bus, and a source-only bench supply usually has no way to absorb that, so the rail climbs until the supply safety faults or something on it dies. A battery handles short regen bursts much better, though only inside its voltage, state of charge, temperature, BMS, and charge-current limits. Top a pack off, or have the BMS drop out at the wrong moment, and that energy is right back to having nowhere to go.

FINN now runs off a commercial Greenworks 24V tool battery mounted partway up the mast. Enormously better than the bench supply, and it means the whole robot and a good chunk of its mass can move around during testing. It’s also hot-swappable and can prolong testing sessions. Eventually I'd love to have FINN change its own battery but that's much further down the road. 

Long term it's an 8S4P pack of 21700 lithium-ion cells. I don't yet trust myself to design and assemble a high-current lithium-ion pack safely, and a cordless drill battery is the safe choice until I do.

On the robot a buck converter drops the pack down to 5V for the controller and sensors. Power distribution at the base is Wago-style lever connectors, which I’ve heard nobody puts in a robot, but they're fast, they hold well enough for bring-up, and I can see what's connected to what at a glance so they work for me.

## **The head, which is the actual point**

The head and arms are still being figured out on paper. But the head is where the interaction question starts, so I've thought about it considerably more than the priority list and schedule justifies.

The current concept is a two-axis gimbal with two camera modules. This came out of watching my fiancée work with cameras, where small deliberate movements read as intentional almost immediately. Convergence can signal focus. Pan and tilt moving together can show attention. A little asymmetry can suggest curiosity or uncertainty. All of it without a screen displaying cartoon eyes, which I find uncanny, and then industry has adopted for more widely than I think it has earned. 

The working hypothesis is that a small vocabulary of mechanically legible camera movements is enough to convey attention and internal state without a humanlike face, and that a policy can learn to extend that vocabularyy instead of me hand-authoring every gesture. 

The problem is that if the head moves independently, the stereo extrinsics move with them. Getting reliable depth out of that would need precise joint sensing and dynamic calibration, which will be a real sub-project on its own. The fallback is fixed cameras doing perception and the head doing nothing but social signaling. I don't know which way it goes yet. If a chest camera shows up on FINN later, that's what happened.

Arms are less settled. Integrated quasi-direct-drive actuators, like something from RobStride with its planetary reducer and encoder in the housing, are still where I think it ends up. Although, SO-101 arms are cheap enough that they might be the right thing to bolt on for the first round of manipulation and data collection, and I keep going back and forth on whether starting cheap there teaches me more or less since I’ll be tempted to just use the Hugging Face LeRobot library rather than build out the dynamics and libraries on my own.

## **From parts to a platform**

When I started writing this entry, the wiring was done, the brackets were printed, and the power system was online. The next job was calibrating the motors and identifying enough of the system to build a simulator worth trusting.

That's more than making a motor profile. Mass distribution, inertia, friction, wheel dynamics, battery behavior, control latency, all of it has to be close enough that when the sim fails, it fails in a way I recognize and diagnose.

I wanted a classical controller working before touching anything learned. I assumed that meant PID. Once the identified model existed, LQR turned out to be the better first test, because it can use the coupled dynamics directly instead of me hand-tuning loops that fight each other. The principle didn't change either way: if a classical controller can't stabilize the identified model, dropping a learned policy on top mostly just makes the failure harder to read.

*SPLIT VIEW: data/balance.gif AND balance\_chart.png*

So that's where it sits. First sysid pass done, LQR balancing the identified model in sim. Balancing while creeping forward, actually. There's a slow drift I havent run down yet, and I don’t know whether it's the cost function not penalizing position, steady state error from something I mismodeled in the friction, or the linearization sliding out from under it as the state moves from upright. The next entry is fixing this, how I identified the model, and however much sim-to-real gap is left over after I go find out.

Everything lives at github.com/Masony817/finn. Firmware, CAD, models, data, and experiment logs, updated as I go.

## **What FINN is actually for**

I don't have a clean product answer and I'd rather say that than invent one.

The technical version: it's a low-cost platform for studying control, manipulation, and interaction on a body that's dynamically unstable and mobile. No legs, so no leg budget, but the whole-body coupling survives intact. Every time the head or the torso or an arm moves, the balance problem changes underneath it.

The questions I want to get at are whether it stays controllable as the mass distribution keeps changing, how upper-body motion should coordinate with the base, and whether expressive head movement can communicate attention with no face involved. Those will get replaced by better questions the moment the hardware starts telling me which assumptions were wrong. What I want at the end of all this is a platform and a pile of experiments that other people can pull apart, reproduce, and argue with.

I still hope that eventually the robot tells me what it's good for. I'd rather the answer come out of running the thing than out of a pitch I wrote before it could stand up. 

Ask me again after it balances and navigates.

---

FINN is self-funded. There's a project-support link on my website for anyone who wants to help cover parts and fabrication.

