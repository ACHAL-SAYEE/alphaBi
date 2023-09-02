import React, {Component} from 'react'
import {FaLessThan, FaGreaterThan} from 'react-icons/fa'
import {auth} from '../../firebase'
import './index.css'

const paginationConstant = 12

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      currentUser: null,
      gifs: [],
      searchTerm: '',
      offset: 0,
      totalCount: 0,
      currentPage: 1,
      isSearched: false,
    }

    this.myRef = React.createRef()
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user)
        this.setState({currentUser: user, loading: false})
      }
    })
  }

  searchGifs = async () => {
    const {searchTerm} = this.state
    const apiKey = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65'
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&offset=${this.state.offset}&limit=${paginationConstant}`,
    )
    const data = await response.json()
    console.log('data', data)
    this.setState({
      gifs: data.data,
      totalCount: data.pagination.total_count,
      pages: Math.ceil(data.pagination.total_count / paginationConstant),
      isSearched: true,
    })
  }

  handleSearchInputChange = e => {
    this.setState({searchTerm: e.target.value})
  }

  handleSearchButtonClick = () => {
    this.setState({offset: 0}, () => {
      this.searchGifs()
    })
  }

  loadNextPage = () => {
    this.setState(
      prevState => ({
        offset: prevState.offset + paginationConstant,
        currentPage: prevState.currentPage + 1,
      }),
      () => {
        this.searchGifs()
      },
    )
  }

  loadPreviousPage = () => {
    this.setState(
      prevState => ({
        offset: Math.max(0, prevState.offset - paginationConstant),
        currentPage: prevState.currentPage - 1,
      }),
      () => {
        this.searchGifs()
      },
    )
  }

  logout = () => {
    auth.signOut()
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {
      currentUser,
      loading,
      gifs,
      searchTerm,
      offset,
      currentPage,
      totalCount,
      isSearched,
      pages,
    } = this.state

    if (loading) return <p>loading</p>

    return (
      <div>
        {currentUser && (
          <div className="bg-container">
            <div className="info">
              <p className="heading">
                Hi {currentUser.displayName} welcome to gif search
              </p>
              <button className="logout-btn" onClick={this.logout}>
                LogOut
              </button>
            </div>
            <div className="results-search">
              <div className="search-container">
                <input
                  ref={this.myRef}
                  type="search"
                  className="searchgif"
                  placeholder="Article name or keywords"
                  value={searchTerm}
                  onChange={this.handleSearchInputChange}
                />
                <button
                  className="btn"
                  onClick={() => {
                    this.setState({currentPage: 1})
                    this.handleSearchButtonClick()
                  }}
                >
                  Search
                </button>
              </div>
              <div className="results">
                {gifs.map(gif => (
                  <iframe
                    className="gifs"
                    key={gif.id}
                    src={`${gif.embed_url}`}
                    frameBorder="0"
                    allowFullScreen
                    title="Embedded Giphy GIF"
                  />
                ))}
              </div>
              {isSearched && (
                <>
                  <p className="result-info-para">{totalCount} results found</p>
                  <div className="pagination">
                    <button
                      disabled={offset === 0}
                      onClick={this.loadPreviousPage}
                      className="pagination-btn"
                    >
                      <FaLessThan />
                    </button>
                    <p>
                      {currentPage}/{pages}
                    </p>
                    <button
                      disabled={currentPage === pages}
                      onClick={this.loadNextPage}
                      className="pagination-btn"
                    >
                      <FaGreaterThan />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Home
