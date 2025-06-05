[← back to main](/)

# ask-human mcp

I just shipped a tiny thing that keeps your ai from hallucinating and gives it an escape route when confused or issues arise

## the pain:

ai blurts out an endpoint that never existed

the agent makes assumptions that are simply not true and has false confidence

repeat x100 errors and your day is spent debugging false confidence and issues when I simply could ask you a question

## the fix — ask-human mcp:

an mcp server that lets the agent raise its hand instead of hallucinating. feels like mentoring a sharp intern who actually asks before guessing.


```
agent → ask_human()
⬇
question lands in ask_human.md
⬇
you swap "PENDING" for the answer
⬇
agent keeps coding
```

**sample file:**

```markdown
### Q8c4f1e2a
ts: 2025-01-15 14:30  
q: which auth endpoint do we use?  
ctx: building login form in auth.js  
answer: PENDING
```

you drop:

```markdown
answer: POST /api/v2/auth/login
```

boom flow continues and hopefully the issues are solved

## why it's good:

- `pip install ask-human-mcp` → done
- zero config, cross-platform
- watches the file, instant feedback
- multiple agents, no sweat
- locks + limits so nothing catches fire
- full q&a history in markdown (nice paper-trail for debugging)

## 30-sec setup:

```bash
pip install ask-human-mcp
ask-human-mcp --help
```

`.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "ask-human": { "command": "ask-human-mcp" }
  }
}
```

restart cursor and vibe.

**links:** [repo](https://github.com/masony817/ask-human-mcp) • [docs](https://github.com/masony817/ask-human-mcp) • [pypi](https://pypi.org/project/ask-human-mcp/)
