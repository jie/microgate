import React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import DoneIcon from 'material-ui/svg-icons/action/done';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import { grey500, greenA400 } from 'material-ui/styles/colors';
import BaseReactComponent from './base';



export default class Paginate extends BaseReactComponent {

  constructor(props) {
    super(props)
    this.state = {
      page: props.page,
      total: props.total,
      parameters: props.parameters,
      perPage: props.perPage,
      leftEdge: 2,
      rightEdge: 2,
      leftCurrent: 2,
      rightCurrent: 5
    }
  }

  static defaultProps = {
    page: 1,
    perPage: 20,
    baseUrl: ''
  };

  static propTypes = {
    baseUrl: React.PropTypes.string,
    page: React.PropTypes.number,
    perPage: React.PropTypes.number,
    total: React.PropTypes.number,
    parameters: React.PropTypes.object,
    perPage: React.PropTypes.number
  };

  getPagesNum() {
    return Math.ceil(Math.ceil(this.state.total / this.state.perPage))
  }

  hasPrev() {
    return this.page > 1
  }

  hasNext() {
    let pages = this.getPagesNum()
    return this.page < pages
  }

  nextPage() {
    let _next_page = this.state.page + 1
    return _next_page
  }

  prevPage() {
    let page = this.state.page
    let _prev_page
    if (page == 1) {
      _prev_page = 1
    } else {
      _prev_page = page - 1
    }
    return _prev_page
  }

  isCurrent(page) {
    return this.page == page
  }

  getIterPages() {
    let leftEdge = this.state.leftEdge;
    let rightEdge = this.state.rightEdge;
    let leftCurrent = this.state.leftCurrent;
    let rightCurrent = this.state.rightCurrent;
    let last = 0;
    let pagesArray = new Array();
    let pages = this.getPagesNum();

    for (let num = 1; num <= pages; num++) {
      if (num <= leftEdge || (num > this.state.page - leftCurrent - 1 && num < this.state.page + rightCurrent) || num > pages - rightEdge) {
        if (last + 1 != num) {
          pagesArray.push(null)
        }
        pagesArray.push(num)
        last = num
      }
    }
    return pagesArray
  }

  makeUrl(page) {
    return `${this.props.baseUrl}?page=${page}`
  }

  render() {
    let pageList = this.getIterPages()
    let pageItems = [];

    for (let i = 1; i <= pageList.length; i++) {
      pageItems.push(
        <li key={ i }>
          <a href={ this.makeUrl(i) }>
            { i }
          </a>
        </li>
      )
    }
    return (
      <div className="paginate">
        <ul>
          <li>
            <a href={ this.makeUrl(this.prevPage()) }>prev</a>
          </li>
          { pageItems }
          <li>
            <a href={ this.makeUrl(this.nextPage()) }>next</a>
          </li>
          <div style={ { clear: 'both' } }></div>
        </ul>
      </div>
    )
  }
}
