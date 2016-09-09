import React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import DoneIcon from 'material-ui/svg-icons/action/done';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import { grey500, greenA400 } from 'material-ui/styles/colors';
import BaseReactComponent from './base';
import FontIcon from 'material-ui/FontIcon';
import { blue500, red500, greenA200 } from 'material-ui/styles/colors';

const iconStyles = {
  marginTop: 5,
  width: 20,
  height: 20
};
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
    return this.state.page > 1
  }

  hasNext() {
    let pages = this.getPagesNum()
    return this.state.page < pages
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      baseUrl: nextProps.baseUrl,
      page: nextProps.page,
      perPage: nextProps.perPage,
      total: nextProps.total,
      parameters: nextProps.parameters,
      perPage: nextProps.perPage
    })
  }


  render() {
    let pageList = this.getIterPages()
    let pageItems = [];
    let nextItem;
    let prevItem;

    if (this.hasNext()) {
      nextItem = <li>
                   <a href={ this.makeUrl(this.nextPage()) }>
                     <ArrowForwardIcon style={ iconStyles } />
                   </a>
                 </li>
    }

    if (this.hasPrev()) {
      prevItem = <li>
                   <a href={ this.makeUrl(this.prevPage()) }>
                     <ArrowBackIcon style={ iconStyles } />
                   </a>
                 </li>
    }

    for (let i = 1; i <= pageList.length; i++) {
      pageItems.push(
        <li key={ i }>
          <a className={ i == this.props.page ? 'active' : '' } href={ this.makeUrl(i) }>
            { i }
          </a>
        </li>
      )
    }

    return (
      <div className="paginate">
        <ul>
          { prevItem }
          { pageItems }
          { nextItem }
          <div style={ { clear: 'both' } }></div>
        </ul>
      </div>
    )
  }
}
