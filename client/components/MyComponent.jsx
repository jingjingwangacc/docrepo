import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import CharacterCard from './CharacterCard';
// import DetailsModal from './DetailsModal';

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   fetchedChars: false,
      //   characters: [],
      //   modalState: {
      //     open: false,
      //     type: null,
      //     position: { top: 0, left: 0 },
      //     id: null
      //   }
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    // fetch('/api/')
    //   .then(res => res.json())
    //   .then((characters) => {
    //     if (!Array.isArray(characters)) characters = [];
    //     return this.setState({
    //       characters,
    //       fetchedChars: true
    //     });
    //   })
    //   .catch(err => console.log('Characters.componentDidMount: get characters: ERROR: ', err));
  }

  openModal(type, position, id) {
    // this.setState({
    //   modalState: {
    //     ...this.state.modalState,
    //     open: true,
    //     type,
    //     position,
    //     id
    //   }
    // });
  }

  closeModal() {
    // this.setState({
    //   modalState: {
    //     ...this.state.modalState,
    //     open: false
    //   }
    // });
  }

  createSubmission() {
    fetch('/submission', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1,
        submissionDescription: "my test submission",
        reviewerIds: [2, 3]

      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
  }

  render() {
    return (
      <div>
        <h1>Hello World! Doc Repo!</h1>
        <button onClick={this.createSubmission}>CreateOne</button>
      </div>
    )
    // if (!this.state.fetchedChars) return (
    //   <div>
    //     <h1>Loading data, please wait...</h1>
    //   </div>
    // );

    // const { characters } = this.state;

    // if (!characters) return null;

    // if (!characters.length) return (
    //   <div>Sorry, no characters found</div>
    // );

    // const charElems = characters.map((char, i) => {
    //   return (
    //     <CharacterCard
    //       key={i}
    //       info={char}
    //       openModal={this.openModal}
    //     />
    //   );
    // });

    // return (
    //   <section className="mainSection">
    //     <header className="pageHeader">
    //       <h2>Characters</h2>
    //       <Link to={'/create'}>
    //         <button
    //           type="button"
    //           className="btnSecondary"
    //         >
    //           Create Character
    //         </button>
    //       </Link>
    //     </header>
    //     <div className="charContainer">
    //       {charElems}
    //     </div>
    //     {this.state.modalState.open &&
    //       <DetailsModal
    //         type={this.state.modalState.type}
    //         position={this.state.modalState.position}
    //         id={this.state.modalState.id}
    //         closeModal={this.closeModal}
    //       />
    //     }
    //   </section>
    // );
  }
}

export default MyComponent;
