import express, { Router } from 'express'
const router = express.Router();
import { registerUser, GoogleRegister, loginUser, loginGoogleUser, logoutUser, getProfile } from '../controllers/Auth.js';
import { createChild, getChildrenByParentID, loginChild, getChildProfile, assignBookToChild,  } from '../controllers/ChildController.js';
import { newBook, getAllBooks, updateBookProgress, updateQuizResult, getBooksByReadingLevel } from '../controllers/BookController.js';


router.post('/registerUser', registerUser)
router.post('/Googleregister', GoogleRegister)
router.post("/loginUser", loginUser)
router.post("/googleLogin", loginGoogleUser)
router.post("/logoutUser", logoutUser)
router.get('/profile', getProfile);

//CHILD
router.post('/newchild', createChild)
// Get children for a specific parent
router.get('/children/:parentID', getChildrenByParentID);
router.post('/loginchild', loginChild)
router.get('/childprofile', getChildProfile )

//BOOKS


router.post('/newbook', newBook )
router.get('/getbooks', getAllBooks)
router.post('/assigntochild', assignBookToChild)
router.post('/updateBookProgress', updateBookProgress)
router.post('/updateQuizResult', updateQuizResult)
router.get('/getBooksByReadingLevel', getBooksByReadingLevel)



export default router