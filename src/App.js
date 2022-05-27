import React, { Component } from 'react';
import { getAllMeals,getMealByName,getIngredients } from './api';
import { Nav,Form,Button,Navbar,Container,Stack,Figure } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor () {
    super()
    this.state = {
        meals: [],
        searchString: '',
        searchByMeals: true,
        include: '',
        exclude: ''
    };
  }

  setSearchString = (searchString) => {
    this.setState({ searchString })
  }

  setSearchByMeals = (searchByMeals) => {
    this.setState({ searchByMeals })
  }

  setInclude = (include) => {
    this.setState({ include })
  }

  setExclude = (exclude) => {
    this.setState({ exclude })
  }

  componentDidMount = async () => {
    const meals = await getAllMeals()
    this.setState({ meals: meals })
  }

  handleSubmit = async(e) => {
    e.preventDefault();
    if (this.state.searchByMeals) {
      const searchString = this.state.searchString
      const meals = await getMealByName(searchString)
      this.setState({ meals: meals })
    } else {
      const include = JSON.stringify(this.state.include.split(','))
      const exclude = JSON.stringify(this.state.exclude.split(','))
      const meals = await getIngredients(include,exclude)
      this.setState({ meals: meals })
    }
  }

  render(){
    return (
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">MealDB API Client</Navbar.Brand>
            <Nav className="me-auto"></Nav>
          </Container>
        </Navbar>
        <br/>
        <Container>
          <Form inline="true">
            <Form.Group className="mb-3" controlId="search">
            <Stack direction="horizontal" gap={3}>
            <Form.Check
                inline
                aria-selected
                defaultChecked
                label='Meals'
                name='group-1'
                type='radio'
                id='meals'
                value={true}
                onChange={e => this.setSearchByMeals(JSON.parse(e.target.value))}
            />
            <Form.Check
                inline
                label='Ingredients'
                name='group-1'
                type='radio'
                id='ingredients'
                value={false}
                onChange={e => this.setSearchByMeals(JSON.parse(e.target.value))}
            />
            {this.state.searchByMeals? 
            (<Form.Control size='lg' type="text" placeholder="Search for meals..." value={this.state.searchString || ''} onChange={e => this.setSearchString(e.target.value)}/>) : 
            (<Stack direction="horizontal" gap={3} style={{width: 1000}}>
              <Form.Control size='lg' type="text" placeholder="Ingredients to include..." value={this.state.include || ''} onChange={e => this.setInclude(e.target.value)}/>
              <Form.Control size='lg' type="text" placeholder="Ingredients to exclude..." value={this.state.exclude || ''} onChange={e => this.setExclude(e.target.value)}/>
            </Stack>)}
              <br />
              <Button size='lg' variant="dark" type="button" onClick={this.handleSubmit} disabled={
                (this.state.searchByMeals && this.state.searchString === '') || (!this.state.searchByMeals && (this.state.include === '' && this.state.exclude === ''))
              }> 
                Search 
              </Button>
            </Stack>
            </Form.Group>
          </Form>
        </Container>
        <Container>
        <hr></hr>
        {this.state.meals.map((meal) => {
          return(
            <Figure key={meal['id']} style={{margin: 10}}>
              <Figure.Image
                width={150}
                height={150}
                src={meal['source']['strMealThumb']}
              />
              <Figure.Caption> {meal['source']['strMeal'] || ''} </Figure.Caption>
              <Figure.Caption> {meal['source']['strArea']}, {meal['source']['strCategory']} </Figure.Caption>
              
              <br></br>
            </Figure>
          )
        })}
        </Container>
      </div>
    )
  }
}

export default App;
