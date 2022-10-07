import { AccessToken } from '../models';

export function canRenew(token: AccessToken): token is Required<AccessToken> {
  return hasValidRefreshToken(token);
}

export function requiresRefresh(token: AccessToken): boolean {
  return isAccessTokenExpired(token);
}

function isAccessTokenExpired(token: AccessToken): boolean {
  return !!token.expiresAt && Date.now() > token.expiresAt;
}

function hasValidRefreshToken(token: AccessToken): boolean {
  return (
    !!token.refreshToken &&
    (!token.refreshTokenExpiresAt || Date.now() < token.refreshTokenExpiresAt)
  );
}

export function parseToken<Payload>(token: string): Payload {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = JSON.parse(
    decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
  );
  const parsedSub = JSON.parse(jsonPayload.sub);

  return {
    ...jsonPayload,
    sub: parsedSub,
  };
}