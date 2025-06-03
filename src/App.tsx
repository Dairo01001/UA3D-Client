import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import { lazy, Suspense } from 'react'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  AdminGuard,
  AdminLayout,
  PublicLayout,
  ThemeProvider,
  Toaster
} from './components'
import { About, Faculty, Home, Rol } from './pages'
import { AdminServer } from './pages/admin-server'
import { AdminServerDetails } from './pages/admin-server-details'
import { CreateServer } from './pages/create-server'
import { FacultyDetail } from './pages/faculty-detail'
import { Program } from './pages/program'
import ServerStatus from './pages/server-status/server-status'
import { SignUp } from './pages/sign-up/sign-up'
import { UserStatus } from './pages/user-status/user-status'
import store from './redux/store'
import { Console } from './pages/Console/console'
import { AdminUser } from './pages/admin-user/admin-user'
import { AdminUserDetails } from './pages/admin-user-details/admin-user-details'
import { config } from './config/config'
import { EditArchive } from './pages/edit-archive/EditArchive'
import { CommandSearch } from './pages/command-search/CommandSearch'

axios.defaults.baseURL = config.apiUrl

const Login = lazy(() => import('@/pages/Login/Login'))
const Profile = lazy(() => import('@/pages/Profile/Profile'))
const Server = lazy(() => import('@/pages/Server/Server'))
const Ua3d = lazy(() => import('@/pages/projects/ua3d/ua3d'))
const LabIot = lazy(() => import('@/pages/projects/lab-iot/lab-iot'))
const Zogui = lazy(() => import('@/pages/projects/zogui/zogui'))
const Labe = lazy(() => import('@/pages/projects/labe/labe'))

const App = () => {
  const queryClient = new QueryClient()

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          <Provider store={store}>
            <Suspense fallback={<h1>Loading...</h1>}>
              <BrowserRouter>
                <Routes>
                  <Route element={<PublicLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/server" element={<Server />} />
                    <Route path="/ua3d" element={<Ua3d />} />
                    <Route path="/laboratorio-iot" element={<LabIot />} />
                    <Route path="/zogui" element={<Zogui />} />
                    <Route path="/labe" element={<Labe />} />
                  </Route>
                  <Route element={<AdminGuard />}>
                    <Route element={<AdminLayout />}>
                      <Route path="/dashboard" element={<CommandSearch />} />
                      <Route path="/create-server" element={<CreateServer />} />
                      <Route path="/faculty" element={<Faculty />} />
                      <Route path="/faculty/:id" element={<FacultyDetail />} />
                      <Route path="/program" element={<Program />} />
                      <Route path="/rol" element={<Rol />} />
                      <Route path="/server-status" element={<ServerStatus />} />
                      <Route path="/user-status" element={<UserStatus />} />
                      <Route path="/servers" element={<AdminServer />} />
                      <Route path="/users" element={<AdminUser />} />
                      <Route path="/user/:id" element={<AdminUserDetails />} />
                      <Route
                        path="/servers/:gridName/archive"
                        element={<EditArchive />}
                      />
                      <Route
                        path="/servers/:id"
                        element={<AdminServerDetails />}
                      />
                      <Route
                        path="/servers/:id/console"
                        element={<Console />}
                      />
                    </Route>
                  </Route>
                </Routes>
              </BrowserRouter>
              <Toaster />
            </Suspense>
          </Provider>
        </CookiesProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
