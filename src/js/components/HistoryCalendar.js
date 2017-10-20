import React from "react";
import ReactDOM from 'react-dom';
import 'react-select/dist/react-select.css';
import Modal from 'react-modal';
import { appConfig,routeResp } from '../config';
import { get_jobInfo_byJobId} from '../api';
import '../css/pop.css';
import '../css/normal.css';
import '../css/icon.css';
//calendar
import Calendar from 'rc-calendar';
import enUS from 'rc-calendar/lib/locale/en_US';
const formatStr = 'YYYY-MM-DD';
import '../css/calendar.css';
const titleString = "Choose Date Range";

//POP
import Info from './Info';

export default class MyModal extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
      modalIsOpen: false,
      startDate:"",
      endDate:""
   };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.applyFunction = this.applyFunction.bind(this);
    //calendar
    this.onStandaloneChange = this.onStandaloneChange.bind(this);
    this.onStandaloneSelect = this.onStandaloneSelect.bind(this);
    this.format = this.format.bind(this);
 }

	openModal() {
		this.setState({modalIsOpen: true,startDate:"",endDate:""});
	}
	closeModal() {
		this.setState({modalIsOpen: false});
	}
  applyFunction() {
    if(this.state.startDate == "" ){
      this.refs.FailMsg.updateContent("error","Fail Log","Please select date");
      this.refs.FailMsg.openModal();
    }
    else{
      this.props.dateSelect(this.state.startDate,this.state.endDate);
      this.closeModal();
    }
	}

  format(v) {
    return v ? v.format(formatStr) : '';
  }

  onStandaloneChange(value) {

  }

  onStandaloneSelect(value) {
    this.setState({startDate:value.format(formatStr)});
  }

  render() {
    const marginOrange="35px";
    return (
      <div style={{width:"100%",height:"100%"}}>
        <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={resetModalStyle}
            contentLabel="Example Modal"
        >
          <div style={{width:"100%",height:"100%"}}>
            <div className="popHeader">
                  <span className="f_medium">{titleString}</span>
                  <a className="i_closeBtn" onClick={this.closeModal} />
            </div>
            <div className="titleHr"></div>

            <div style={bodyContentStyle}>
              <div style={{float:"left",width:'100%',paddingLeft:"60px",paddingRight:"60px"}}>
                <div>
                  <div style={{marginBottom:"8px",width:'100%'}}>
                    <div style={{width:'50%'}}>Start Date:</div>
                  </div>
                  <div style={{marginBottom:"8px",width:'100%'}}>
                    <div className={'dateInput'} style={{width:'90px'}}><text>{this.state.startDate}</text></div>
                  </div>
                </div>
                <div style={{marginBottom:"8px",height:"210px",width:'100%'}}>
                  <Calendar
                    showWeekNumber={false}
                    locale={enUS}
                    showToday={false}
                    format={formatStr}
                    showOk={false}
                    onChange={this.onStandaloneChange}
                    onSelect={this.onStandaloneSelect}
                    showDateInput={false}
                  />
                </div>
              </div>
            </div>

            <div style={{marginBottom:"24px"}}>
              <div style={{float:"right",marginLeft:"8px",marginRight:"35px"}}>
								<button class="button_commit button_no" onClick={this.closeModal}>Cancel</button>
							</div>
							<div style={{float:"right"}}>
								<button class="button_commit button_yes" onClick={this.applyFunction}>Apply</button>
							</div>
							<div style={{clear:"both"}}></div>
            </div>
          </div>
          <Info ref="FailMsg" type="error" title="" content=""/>
        </Modal>
      </div>

    );
  }
}
const bodyContentStyle=
{
    fontFamily: 'Roboto-M',
    fontSize: '14px',
    color: '#131313',
    width              : '100%',
    height             : '100%'

}

const resetModalStyle = (() => {
  // Styles
  const initial = null

  const overlay = {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.5)',
    zIndex: 100
  }
  const content = {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    padding               : '0 0 0 0',
    minWidth              : '350px',
    minHeight             : '423px',
    backgroundColor       : '#f6f8f9',
    transform             : 'translate(-50%, -50%)'
  }

  return {overlay, content}
})()
