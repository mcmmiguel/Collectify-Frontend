type LogoProps = {
    darkMode: boolean;
}

const Logo = ({ darkMode }: LogoProps) => {
    return (
        <img src={`/logo-${darkMode ? 'white' : 'black'}.png`} alt="Collectify Logo" />
    )
}
export default Logo