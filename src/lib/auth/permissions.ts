import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import type { User } from '.'

const defineAbility = (user: User | null) => {
    const { can, cannot, rules } = new AbilityBuilder(createMongoAbility)

    // Content
    can('read', 'Content', { public: true })
    can('interact', 'Content')
    can('update', 'Content', ['content', 'title', 'subject', 'level'], { authorId: user?.id })
    can('delete', 'Content', { authorId: user?.id })

    if (user?.roles.includes('admin')) {
        can('manage', 'Content')
    }

    // Question
    can('read', 'Question')
    can('interact', 'Question')

    if (user?.roles.includes('admin')) {
        can('manage', 'Question')
    }

    // User
    can('read', 'User')
    can('update', 'User', ['avatar', 'username', 'name', 'gender', 'level'], { id: user?.id })

    if (user?.roles.includes('admin')) {
        can('manage', 'User')
        cannot('manage', 'User', { roles: { $in: ['admin'] } })
    }

    return createMongoAbility(rules)
}

export const permissions = defineAbility
