# Implementation Plan - Phase 2: Core User Flow & Authentication

This phase focuses on completing the core user journey: discovering vehicles, viewing details, and securing an account for booking.

## User Review Required

> [!IMPORTANT]
> We need to decide on the authentication strategy. I'll implement a standard JWT-based flow with a custom Auth Provider. If you prefer `next-auth`, please let me know.

## Proposed Changes

### 1. Authentication Layer
Implementing a robust authentication system to manage user sessions and protect booking routes.

#### [NEW] [auth.service.ts](file:///d:/Downloads/vehicle-rental-frontend/src/services/auth.service.ts)
- Implement `login`, `register`, and `me` methods.
- Handle JWT storage in localStorage/cookies.

#### [NEW] [auth-provider.tsx](file:///d:/Downloads/vehicle-rental-frontend/src/components/providers/auth-provider.tsx)
- Create a `useAuth` hook and context.
- Manage user state and loading status.

#### [MODIFY] [signin/page.tsx](file:///d:/Downloads/vehicle-rental-frontend/src/app/(auth)/signin/page.tsx) & [signup/page.tsx](file:///d:/Downloads/vehicle-rental-frontend/src/app/(auth)/signup/page.tsx)
- Connect forms to the `authService`.
- Add validation and error handling with `sonner`.

---

### 2. Vehicle Discovery (Details)
Creating a high-end vehicle details page with advanced animations and a sleek booking interface.

#### [NEW] [[id]/page.tsx](file:///d:/Downloads/vehicle-rental-frontend/src/app/vehicles/[id]/page.tsx)
- Dynamic route to fetch and display vehicle details.
- Hero section with image gallery and key specs.
- Interactive booking sidebar/form.

#### [NEW] [booking-form.tsx](file:///d:/Downloads/vehicle-rental-frontend/src/components/vehicles/booking-form.tsx)
- A specialized component for selecting dates and calculating total price.
- Premium UI with Framer Motion animations.

---

### 3. Navigation & State
Ensuring the app feels cohesive.

#### [MODIFY] [navbar.tsx](file:///d:/Downloads/vehicle-rental-frontend/src/components/layout/navbar.tsx)
- Update to show user profile/logout when authenticated.
- Smooth transitions between auth states.

## Verification Plan

### Automated Tests
- None at this stage (manual verification prioritized).

### Manual Verification
1. **Auth Flow**: Register a new user, log in, and verify the session persists on page refresh.
2. **Vehicle Details**: Navigate from the home page/listing to a specific vehicle and verify all data loads correctly.
3. **UI/UX**: Check animations on the new details page for smoothness.
