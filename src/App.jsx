import { useEffect, useState } from 'react'
import './App.css'
import { Auth } from './components/auth'
import {db, auth, storage} from "./config/firebase"
import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore"
import { ref, uploadBytes } from 'firebase/storage'

function App() {

  const [movieList, setMovieList] = useState([])

  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false)

  const [updatedTitle, setUpdatedTitle] = useState('')

  const [fileUpload, setFileUpload] = useState(null)




  const moviesCollectionRef = collection(db, "movies")

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef)
      const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setMovieList(filteredData)
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmitMovie = async () => {
    try {      
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid
      })
      getMovieList()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteMovie = async(id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc)
  }

  const updateMovieTitle = async(id) => {
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc, {title: updatedTitle})
  }

  const uploadFile = async () => {
    if(!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);

    try {
      await uploadBytes(filesFolderRef, fileUpload)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMovieList()
  }, [])

  return (
    <div className='App'>
      <Auth />
      <div>
        <input type="text" placeholder='Title' onChange={(e) => setNewMovieTitle(e.target.value)}/>
        <input type="number" placeholder='Release Date' onChange={(e) => setNewReleaseDate(Number(e.target.value))}/>
        <input type="checkbox" checked={isNewMovieOscar} onChange={(e) => setIsNewMovieOscar(e.target.checked)}/>
        <label >Received An Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{color: movie.receivedAnOscar ? 'green' : 'red'}}>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete</button>

            <input onChange={(e) => setUpdatedTitle(e.target.value)} placeholder='New Title' />
            <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  )
}

export default App
