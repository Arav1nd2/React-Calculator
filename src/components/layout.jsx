import React, { Component } from 'react';
import { Textfit } from 'react-textfit';
import './layout.css';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue : "0",
      operator : "",
      waitingForOperand : false,
      operand1 : null,
      operand2 : null,
      secondary : "0"
    };
    this.handleNumberClick = (number) => {
      if(this.state.waitingForOperand) {
        this.setState({
          displayValue : this.state.displayValue + String(number),
          secondary : this.state.secondary + String(number)
        });
      }
      this.setState({
        secondary : this.state.secondary === '0' ? String(number) : this.state.secondary + String(number),
        
        displayValue : this.state.displayValue === '0' ? String(number) : this.state.displayValue + String(number)
      });
    }
    this.clearButton = () => {
      this.setState({
        displayValue : "0",
        waitingForOperand : false,
        operand1: null,
        operand2 : null,
        secondary : "0",
        operator : ""
      });
    }
    this.handleDot = () => {
      if(!this.state.displayValue.includes('.')) {
        this.setState({
          displayValue : this.state.displayValue + '.',
          secondary : this.state.secondary + '.'
        });
      }
    }
    this.percentage = () => {
      var value = parseFloat(this.state.displayValue);
      this.setState({
        displayValue : String(value/100),
        secondary : this.state.secondary + "% : " + String(value/100)
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
        displayValue : "",
        secondary : this.state.secondary + opt      
      });
    }
    this.handleEqual = () => {
      let val1 = this.state.operand1;
      let val2 = parseFloat(this.state.displayValue);
      let computedValue;
      if(this.state.operator !== "") {
        switch(this.state.operator) {
          case '+' :
            computedValue = val1 + val2;
            break;
          case '-' :
            computedValue = val1 - val2;
            break;
          case '*' :
          computedValue = val1 * val2;
          break;
          case '/' :
          computedValue = val1 / val2;
          break;
        
          default : 
            computedValue = parseFloat(this.state.displayValue);   
            break;   
          }
          this.setState({
            displayValue : String(computedValue),
            secondary : this.state.secondary + " = " + String(computedValue),
            operand1 : computedValue
          });
  
      }
    }
  }
  render() {
    return (
      <div>
        <div className="secondary-display"><Textfit autoResize = {true}>{this.state.secondary}</Textfit></div>
        <div className = "display-area"><Textfit forceSingleModeWidth = {false}>{this.state.displayValue}</Textfit></div>
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
        <button className="equals" onClick = {() => {this.handleEqual()}}>=</button>        
      </div>
    )
  }
}

export default Layout;