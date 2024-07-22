import './UserInfo.css';

interface UserInfoProps {
  user: User | null;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <>
      <div className="userInfo">
        <div>
          <p>Использовано компаний </p>
          <p>Лимит по компаниям </p>
        </div>
        <div className="userNumber">
          <p>{user.eventFiltersInfo.usedCompanyCount}</p>
          <p>{user.eventFiltersInfo.companyLimit}</p>
        </div>
      </div>
      <div className="user">
        <div>
          <p>Алексей А.</p>
          <p>Выйти</p>
        </div>
        <img src="./alex.svg" alt="man" />
      </div>
    </>
  );
};

export default UserInfo;
