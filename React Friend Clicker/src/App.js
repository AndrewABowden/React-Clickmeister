import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
// import Title from "./components/Title";
import Friends from "./friends.json";
import "./App.css";
import { Line } from 'rc-progress';
import Nav from "./components/Nav";

let topScore = 0;
let guessesCorrect = 0;
let lives = 0;
let message = "";



class App extends Component {
  // <Nav />
  // constructor() {
  //   super(); //Have to call super, because whenever we call our class our constructor gets called. Super calls the react.components functions so we can run the constructor.
  //   this.state = {
  //     friends: friends
  //   }
  // }
  // Setting this.state.friends to the friends json array
  state = {
    Friends,
    topScore,
		guessesCorrect,
    message,
    lives
  };

  setClicked = id => {
    const Friends = this.state.Friends;
    const cardClicked = Friends.filter(Friend => Friend.id === id);

    if(cardClicked[0].clicked) {
      guessesCorrect = 0
      message = "Sorry! Start over!";

      for (let i = 0; i < Friends.length; i++) {
        Friends[i].clicked = false;
      }

      this.setState({message});
      this.setState({guessesCorrect});
      this.setState({Friends});
    } else {
      cardClicked[0].clicked = true;

      guessesCorrect = guessesCorrect + 2;
      message = "Nice bro!"

      if (guessesCorrect > topScore) {
        topScore = guessesCorrect;
        lives++;
        this.setState({lives});
        this.setState({topScore});
        this.renderLives();
      }

      Friends.sort((a,b) => {
        return 0.5 - Math.random();
      });

      this.setState({Friends});
      this.setState({guessesCorrect});
      this.setState({message});
    }
  };

    renderLives() {
      let divs = [];
      for (let i=0; i< this.state.lives; i++) {
        divs.push(<div key={i} className="life"></div>);
      }
      return <div>{divs}</div>
    };
  
  // Map over this.state.friends and render a FriendCard component for each Friend object
  render() {
    return (
      <Wrapper>
        <div className="friend">
    				<div className="friendText">
    					<h1 className="banner">Friend Clicker Game</h1>
        				<h3 className="rules">Save the world! Choose wisely.</h3>
        				<h3 className="message">{this.state.message}</h3>
    				</div>
{/*   
        <div className="buttonWrapper">
          <img className="buttons" src="images/buttons.png" alt="game buttons" />
          </div> */}

          <div className="lifeWrapper">
            {this.renderLives()}
              <Line   
                className="progress-bar"
                percent={this.state.guessesCorrect}
                trailWidth="8"
                strokeWidth="8"
                strokeColor="red"
                strokeLinecap="square" />
            </div>
          </div>
        <div className="row">  
        {this.state.Friends.map(Friend => (
          <FriendCard
          setClicked={this.setClicked}
          id={Friend.id}
          key={Friend.id}
          name={Friend.name}
            image={Friend.image}
            occupation={Friend.occupation}
            location={Friend.location}
            className="col-sm-1"
            />
        ))}
        </div>
      </Wrapper>
    );
  }
};

export default App;
// const App = () => (
    // removeFriend = id => {
    //   // Filter this.state.friends for friends with an id not equal to the id being removed
    //   const friends = this.state.friends.filter(Friend => Friend.id !== id);
    //   // Set this.state.friends equal to the new friends array
    //   this.setState({ friends });
    // }