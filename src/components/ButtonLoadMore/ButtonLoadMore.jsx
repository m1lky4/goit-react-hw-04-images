import { Component } from "react";
import s from './Button.module.css';



export class ButtonLoadMore extends Component {
    render() {
        return (
            <button className={s.Button} type="button" onClick={this.props.loadMore}>Load more</button>
    );
}
};