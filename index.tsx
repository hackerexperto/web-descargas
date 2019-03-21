import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//reactstrap
//import { Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap'
import { Collapse, Button, CardBody, Card, CardText, CardColumns, CardTitle } from 'reactstrap';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

class ProgramRow extends React.Component<{name: string}> {
  render() {
    return (
      <div>
        <br/>
        <Col xs={{ size: 10, offset: 1 }} className="border rounded">
          <br/>
          <Row className="align-items-center mx-auto">
            <Col>
              <h5 className="float-left">{this.props.name}</h5>
            </Col> 
            <Col>
              <Button color="success" className="float-right">Descargar</Button>
            </Col>
          </Row>
          <br/>
        </Col>
      </div>    
    );
  }
}

class ProgramCategoryRow extends Component<{names: any}> {
  render() {
    const rows: JSX.Element[] = [];

    this.props.names.forEach((name: string) => {
      rows.push(
        <ProgramRow
          name={name}
          key={name} />
      );
    });

    return (
      rows
    );
  }
}

class ProgramTable extends React.Component<{programs: any[]}, {collapses: boolean[]}> {
  constructor(props: any) {
    super(props);
    this.state = { collapses: new Array(props.programs.length).fill(true) };
  }

  toggle(i: number) {
    const collapses = this.state.collapses.slice();
    collapses[i] = !collapses[i];
    this.setState(({ collapses: collapses }));
  }

  render() {
    const rows: JSX.Element[] = [];
    let i: number = 0;

    this.props.programs.forEach((program: any) => {
      rows.push(
        <div>
          <br/>
          <Row>
            <Col xs={{ size: 10, offset: 1 }}>
              <Button color="dark" size="lg" block onClick={this.toggle.bind(this, i)} style={{ marginBottom: '1rem' }}>{program.category}</Button>         
            </Col>
          </Row>
          <Collapse isOpen={this.state.collapses[i]}>
            <ProgramCategoryRow 
              names={program.names}
              key={program.category} />  
          </Collapse>         
        </div>
      );
      ++i;
    });

    return (
      rows
    );
  }
}

class Barra extends React.Component<{}, {isOpen: boolean}> {
  constructor(props: any) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">PROGRAMAS GRATIS</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Categoria
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Categoria 1
                  </DropdownItem>
                  <DropdownItem>
                    Categoria 2
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          {/*<h1> PROGRAMAS GRATIS </h1>*/}
          <Container>
            <Row>              
              <Col xs={{ size: 10, offset: 1 }}> <Barra /> </Col>
            </Row>
            <ProgramTable programs={PROGRAMS}/>
          </Container>         
        </header>
      </div>
    );
  }
}

// ========================================

const EMULADORES = [
  'Visual Boy Advance',
  'Dolphin'
];

const PROGRAMACION = [
  'Visual Studio Code',
  'NetBeans'
];

const PROGRAMS = [
  {category: 'Emuladores', names: EMULADORES},
  {category: 'Programación', names: PROGRAMACION},
];

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
