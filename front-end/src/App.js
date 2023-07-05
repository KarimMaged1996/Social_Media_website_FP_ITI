import logo from './logo.svg';
import './App.css';
import { MyNav } from './components/MyNav';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { NotFound } from './components/NotFound';
import './assets/js/script.js';
import { SignupPage } from './components/Signup';
import { LoginPage } from './components/Login';
import { DeleteItem } from './components/DeleteItem';
import { Topics } from './components/Topics';
import { ProfileSettings } from './components/ProfileSettings';

import { Activity } from './components/Activity';

import { Post } from './components/Post';
import { PostPage } from './components/PostPage';
import { AllPosts } from './components/AllPosts';
import { AddPost } from './components/AddPost';
import { EditPost } from './components/EditPost';
import { AddComment } from './components/AddComment';
import { EditComment } from './components/EditComment';

import { Profile } from './components/Profile';
import privateRoute from './utils/privateRoute';
import PrivateRoute from './utils/privateRoute';
import EditProfile from './components/EditProfile';
import { AuthProvider } from './context/AuthContext';
import Search from './components/Search';
import { SearchProvider } from './context/SearchContext';
import { ResetPassword } from './components/ResetPassword';
import { NewPassword } from './components/NewPassword';
import Group from './components/Group';
import EditGroup from './components/EditGroup';
import { Explore } from './components/Explore';
import { AllGroups } from './components/AllGroups';
import CreateGroup from './components/CreateGroup';
import { Activate } from './components/Activate';

import Chat from './Chat';

function App() {
  return (
    <div>
      <AuthProvider>
        <SearchProvider>
          <MyNav />
          <Routes>
            <Route path="" element={<PrivateRoute component={Home} />} />
            <Route path="home" element={<Home />} />
            <Route path="post" element={<Post />} />
            <Route path="signup" element={<SignupPage />} />

            <Route path="Login" element={<LoginPage />} />

            <Route path="Delete" element={<DeleteItem />} />
            <Route path="Topics" element={<Topics />} />
            {/* Categories Start here */}
            <Route path="explore" element={<Explore />} />
            {/* Categories End here */}
            {/* Category Groups Start Here */}
            <Route path="category/:id" element={<AllGroups />} />
            {/* Category Groups End Here */}

            <Route path="profile-settings" element={<ProfileSettings />} />

            <Route path="activity" element={<Activity />} />

            <Route path="allposts" element={<AllPosts />} />
            <Route path="post/edit/:id" element={<EditPost />} />
            <Route path="post/:post_id" element={<PostPage />} />

            <Route path="comment/edit/:id" element={<EditComment />} />

            <Route
              path="profile/:id"
              element={<PrivateRoute component={Profile} />}
            />
            <Route
              path="editprofile"
              element={<PrivateRoute component={EditProfile} />}
            />

            <Route
              path="forgetpassword"
              element={<ResetPassword></ResetPassword>}
            />
            <Route
              path="api/resetpassword/:uid/:token"
              element={<NewPassword></NewPassword>}
            />
            <Route path='api/activate/:uid/:token' element={<Activate />} />

            <Route path="search" element={<Search />} />
            <Route path="group/:id" element={<Group />} />
            <Route path="addpost/:id" element={<AddPost />} />
            <Route path="editgroup/:id" element={<EditGroup />} />
            <Route path="creategroup/:id" element={<CreateGroup />} />

            <Route path="chat" element={<PrivateRoute component={Chat} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
