function UserPreview({user}){
  return (
    <div className="flex flex-row items-center justify-between px-6 py-4 hover:bg-(--pnb-alternate-parchment) text-(--pnb-text-green)">
      <div className="flex flex-row items-center gap-2">
        <img src={user['profile_picture']} className="w-16 h-16 border border-(--pnb-gold)"/>
        <div className="text-left">
          <h4 className="font-semibold text-2xl">{user['username']}</h4>
          <h6 className="text-sm">{user['role']}</h6>
        </div>
      </div>
      <div className="text-center">
        <p className="font-semibold text-2xl">{user['post_count']}</p>
        <p className="text-sm">{user['post_count'] > 1 ? "Posts": "Post"}</p>
      </div>
    </div>
  )
}

export default UserPreview;