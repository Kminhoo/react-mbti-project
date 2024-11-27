import UserProfileCard from './UserProfileCard'
import MyResult from './MyResult'

const ProfileSection = () => {
  return (
    <section>
      <div className="max-w-7xl mt-10 mx-auto min-h-[80vh]">
        <div className="flex flex-col items-center justify-center">
          <UserProfileCard />
          <MyResult />
        </div>
      </div>
    </section>
  )
}

export default ProfileSection
