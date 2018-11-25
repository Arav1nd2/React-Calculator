import React, { Component } from 'react';
import './layout.css';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue : "0",
      operator : "",
      waitingForOperand : false,
      operand1 : null,
      operand2 : null
    };
    this.handleNumberClick = (number) => {
      this.setState({
        displayValue : this.state.displayValue === '0' ? String(number) : this.state.displayValue + String(number)
      });
    }
    this.clearButton = () => {
      this.setState({
        displayValue : "0",
        waitingForOperand : false,
        operand1: null,
        operand2 : null
      });
    }
    this.handleDot = () => {
      if(!this.state.displayValue.includes('.')) {
        this.setState({
          displayValue : this.state.displayValue + '.'
        });
      }
    }
    this.percentage = () => {
      var value = parseFloat(this.state.displayValue);
      this.setState({
        displayValue : String(value/100)
      });
    }
    this.sign = () => {
      this.setState({
        displayValue : this.state.displayValue.charAt(0) === '-' ? this.state.displayValue.substr(1) : '-' + this.state.displayValue
      });  
    }
    this.operator = (opt) => {
      this.setState({
        operand1 : parseFloat(this.state.displayValue),
        operator : opt,
        waitingForOperand : true,      
      });
      this.setState({
        displayValue : this.state.operand1 ? this.state.displayValue + opt : this.state.displayValue
      });
    }
  }
  render() {
    return (
      <div>
        <div className = "display-area">{this.state.displayValue}</div>
        <button className="clear-button" onClick = {() => {this.clearButton()}}>AC</button>
        <button className="plus-minus-button" onClick = { ()=> {this.sign()}}>+/-</button>
        <button className="percenatge-button" onClick = { () => {this.percentage()}}>%</button>
        <button className="divide-button" onClick = { () => {this.operator('/')}}>/</button><br/>
        <button className="numbers m" onClick = { () => {this.handleNumberClick(7)}}>7</button>
        <button className="numbers"   onClick = { () => {this.handleNumberClick(8)}}>8</button>
        <button className="numbers"   onClick = { () => {this.handleNumberClick(9)}}>9</button>
        <button className="multiply" onClick = { () => {this.operator('*')}} >X</button><br/>
        <button className="numbers m" onClick = { () => {this.handleNumberClick(4)}}>4</button>
        <button className="numbers"   onClick = { () => {this.handleNumberClick(5)}}>5</button>
        <button className="numbers"   onClick = { () => {this.handleNumberClick(6)}}>6</button>
        <button className="subtract" onClick = { () => {this.operator('-')}} >-</button><br/>
        <button className="numbers m" onClick = { () => {this.handleNumberClick(1)}}>1</button>
        <button className="numbers"   onClick = { () => {this.handleNumberClick(2)}}>2</button>
        <button className="numbers"   onClick = { () => {this.handleNumberClick(3)}}>3</button>
        <button className="add"   onClick = { () => {this.operator('+')}}    >+</button><br/>
        <button className="numbers-zero m" onClick = { () => {this.handleNumberClick(0)}}>0</button>
        <button className="dot" onClick = { () => {this.handleDot()}}>.</button>
        <button className="equals" >=</button>        
      </div>
    )
  }
}

export default Layout;