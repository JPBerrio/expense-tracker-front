import React from 'react';

export default function SignIn({password, setPassword, username, setName }) {
  return (
    <>
      <div>
        <label htmlFor="username" className="sr-only">
        Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          placeholder="Username"
          value={username}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </>
  );
}
