import Button from './Button'

function logout() {
  localStorage.removeItem('token')
  window.location.href = '/'
}

export default function LoginForm({ isTokenValid }) {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      {!isTokenValid() ? (
        <>
          <a href="/login">
            <Button text={'Log in'} color={'yellow'} />
          </a>
          <a href="/register">
            <Button text={'Register'} color={'red'} />
          </a>
        </>
      ) : (
        <>
          <a href="/" onClick={logout}>
            <Button color={'red'} text={'Log out'} />
          </a>
          <a href="/add">
            <Button color={'green'} text={'Create New'} />
          </a>
        </>
      )}
    </div>
  )
}
