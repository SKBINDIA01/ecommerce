export {}

declare global {
  type Roles = 'admin' | 'user' | 'moderator';
  
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}
