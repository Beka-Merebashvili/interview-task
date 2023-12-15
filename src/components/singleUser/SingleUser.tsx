import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../app/userSlice";
import { logoutUser } from "../../app/authSlice";
import styles from "./singleUser.module.css";
import { RootState } from "../../app/store";

const SingleUserPage: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    if (userId) {
      dispatch<any>(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Profile</h2>
      <div className={styles.profile}>
        <img src={user.avatar} alt="avatar" className={styles.image} />
        <div className={styles.userInfo}>
          <p>
            Name: {user.first_name} {user.last_name}
          </p>
          <p>Email: {user.email}</p>
        </div>
      </div>
      <Link to="/users">
        <button className={styles.button}>Back</button>
      </Link>
      <Link to="/">
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </Link>
    </div>
  );
};

export default SingleUserPage;
