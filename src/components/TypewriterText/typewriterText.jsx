import useTypewriterText from './hook';
import PropTypes from 'prop-types';

const TypewriterText = ({ text, speed }) => {
    const displayedText = useTypewriterText(text, speed);

    return <p>{displayedText}</p>
};

TypewriterText.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number
};

TypewriterText.defaultProps = {
    speed: 100
};

export default TypewriterText;