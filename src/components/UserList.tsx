interface User {
  id: string
  name: string
  isTyping?: boolean
}

interface UserListProps {
  users: User[]
}

export function UserList({ users }: UserListProps) {
  return (
    <div className="bg-card rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Users in Room</h2>
      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <span className="text-sm">{user.name}</span>
            {user.isTyping && (
              <span className="text-xs text-muted-foreground animate-pulse">
                typing...
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 