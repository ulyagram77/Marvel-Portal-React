import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './CharRandom.scss';

import mjolnir from '../../assets/mjolnir.png';

class RandomChar extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        char: {},
        loading: true,
        error: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
        //this.timerId = setInterval(this.updateChar, 60000);
    }

    componentWillUnmount() {
        //clearInterval(this.timerId);
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getCharacter(id)
            .then(this.onCharacterLoaded)
            .catch(this.onError);
    };

    onCharacterLoaded = (char) => {
        this.setState({ char, loading: false });
    };

    onError = () => {
        this.setState({ loading: false, error: true });
    };

    render() {
        const { char, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? (
            <ShowRandomCharBlock char={char} />
        ) : null;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!
                        <br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">Or choose another one</p>
                    <button
                        className="button button__main"
                        onClick={this.updateChar}
                    >
                        <div className="inner">try it</div>
                    </button>
                    <img
                        src={mjolnir}
                        alt="mjolnir"
                        className="randomchar__decoration"
                    />
                </div>
            </div>
        );
    }
}

//этот компонент был отделен от основного компонента для удобства работы с RandomChar компонентом
const ShowRandomCharBlock = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    let imgStyle = { objectFit: 'cover' };
    if (
        thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    ) {
        imgStyle = { objectFit: 'contain' };
    }

    return (
        <div className="randomchar__block">
            <img
                src={thumbnail}
                alt="Random character"
                className="randomchar__img"
                style={imgStyle}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a
                        href={homepage}
                        className="button button__main"
                    >
                        <div className="inner">homepage</div>
                    </a>
                    <a
                        href={wiki}
                        className="button button__secondary"
                    >
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomChar;