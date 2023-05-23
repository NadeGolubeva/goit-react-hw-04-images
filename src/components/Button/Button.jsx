import PropTypes from "prop-types"
import css from './Button.module.css'
export const Button = ({loadingMore}) => {
    return (
        <button type="button"
            className={css.button}
        onClick={loadingMore}>
            Load more
        </button>
    )
}
Button.propTypes = {
    loadingMore: PropTypes.func.isRequired 
}