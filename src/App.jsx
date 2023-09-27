import { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';

export class App extends Component {
  state = {
    isLouding: false,
  };

  // onSubmitHandler = (event) => { 
  //   event.preventDefault();
  //   console.log(event.target.value)
  // }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
      </div>
    );
  }
}
