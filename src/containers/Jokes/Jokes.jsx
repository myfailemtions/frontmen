import React, { Component } from 'react'
import connect from 'redux-connect-decorator'
import { array, func } from 'prop-types'
import { fetchJokes } from '../../stores/modules/jokes'
import { markFavoriteJoke, fetchFavorites } from '../../stores/modules/favorite'
import List from '../../components/List'
import Loader from '../../components/Loader'

import './Jokes.css'

const LOADER_TEXT = 'Chuck sad! Jokes is not loaded!'

@connect(
  ({
    jokes: { jokesList },
    favorite: { favorites }
  }) => ({
    jokesList,
    favorites
  }),
  {
    fetchJokes,
    markFavoriteJoke,
    fetchFavorites
  }
)

export default class Jokes extends Component {
  componentWillMount() {
    this.props.fetchJokes({ count: 10 })
    this.props.fetchFavorites({
      page: 1,
      limit: 10
    })
  }

  render() {
    const { jokesList, markFavoriteJoke, favorites } = this.props
    if (jokesList.length === 0) {
      return (
        <Loader title={LOADER_TEXT} />
      )
    }
    return (
      <div className='jokes'>
        <List
          list={jokesList}
          favorites={favorites}
          action={markFavoriteJoke}
        />
      </div>
    )
  }
}

Jokes.propTypes = {
  jokesList: array,
  favorites: array,
  markFavoriteJoke: func,
  fetchJokes: func,
  fetchFavorites: func
}

Jokes.defaultProps = {
  jokesList: [],
  favorites: [],
  markFavoriteJoke: () => {},
  fetchJokes: () => {},
  fetchFavorites: () => {}
}
