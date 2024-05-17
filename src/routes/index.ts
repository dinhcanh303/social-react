import { lazy } from 'react'

const Profile = lazy(() => import('@/pages/Profile'))
const Settings = lazy(() => import('@/pages/Setting'))
const NewFeed = lazy(() => import('@/pages/social/NewFeed'))
const GroupsFeed = lazy(() => import('@/pages/social/GroupsFeed'))
const Group = lazy(() => import('@/pages/social/Group'))
const CreateGroup = lazy(() => import('@/pages/social/CreateGroup'))
const Birthday = lazy(() => import('@/pages/social/Birthday'))

const coreRoutes = [
  {
    path: '/',
    title: 'New Feed',
    component: NewFeed
  },
  {
    path: '/groups/:id',
    title: 'Groups Feed',
    component: Group
  },
  {
    path: '/groups/feed',
    title: 'Groups Feed',
    component: GroupsFeed
  },
  {
    path: '/groups/create',
    title: 'Create Group',
    component: CreateGroup
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile
  },
  {
    path: '/me',
    title: 'Me',
    component: Profile
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings
  },
  {
    path: '/birthdays',
    title: 'Birthdays',
    component: Birthday
  }
]

const routes = [...coreRoutes]
export default routes
