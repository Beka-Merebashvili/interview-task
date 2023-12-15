import styles from "./header.module.css"

const Header = () => {
    return (
       <div className={styles.container}>
        <h1>Test</h1>
        <nav>
            <ul>
                <li>Home</li>
                <li>Contact</li>
                <li>About Us</li>
            </ul>
        </nav>
       </div>
    )
}

export default Header