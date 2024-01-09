import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './CharInfo.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharacterInfo();
    }

    componentDidUpdate(prevProps) {
        if (this.props.characterId !== prevProps.characterId) {
            this.updateCharacterInfo();
        }
    }

    updateCharacterInfo = () => {
        const { characterId } = this.props;
        if (!characterId) {
            return;
        }

        this.onCharacterLoading();
        this.marvelService
            .getCharacter(characterId)
            .then(this.onCharacterLoaded)
            .catch(this.onError);
    };

    onCharacterLoaded = (char) => {
        this.setState({ char, loading: false });
    };

    onCharacterLoading = () => {
        this.setState({ loading: true });
    };

    onError = () => {
        this.setState({ loading: false, error: true });
    };

    render() {
        const { char, loading, error } = this.state;

        const skeleton = char || loading || error ? null : <Skeleton />;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !char) ? (
            <View char={char} />
        ) : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    let imgStyle = { objectFit: 'cover' };
    if (
        thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    ) {
        imgStyle = { objectFit: 'contain' };
    }

    return (
        <>
            <div className="char__basics">
                <img
                    src={thumbnail}
                    alt={name}
                    style={imgStyle}
                />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
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
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0
                    ? null
                    : 'There are no comics with this character =('}
                {comics.map((item, i) => {
                    if (i > 9) return;
                    return (
                        <li
                            key={i}
                            className="char__comics-item"
                        >
                            {item.name}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

View.propTypes = {
    char: PropTypes.object,
};

CharInfo.propTypes = {
    characterId: PropTypes.number,
};

export default CharInfo;
