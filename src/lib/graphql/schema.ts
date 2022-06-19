import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * Implement the DateTime<Utc> scalar
   *
   * The input/output is a string in RFC3339 format.
   */
  DateTime: any;
  /**
   * A UUID is a unique 128-bit number, stored as 16 octets. UUIDs are parsed as Strings
   * within GraphQL. UUIDs are used to assign unique identifiers to entities without requiring a central
   * allocating authority.
   *
   * # References
   *
   * * [Wikipedia: Universally Unique Identifier](http://en.wikipedia.org/wiki/Universally_unique_identifier)
   * * [RFC4122: A Universally Unique IDentifier (UUID) URN Namespace](http://tools.ietf.org/html/rfc4122)
   */
  UUID: any;
};

export type AccountRegister = {
  __typename?: 'AccountRegister';
  error?: Maybe<AccountRegisterError>;
  user?: Maybe<User>;
};

export type AccountRegisterError = {
  __typename?: 'AccountRegisterError';
  code: AccountRegisterErrorCode;
  field: Scalars['String'];
  message: Scalars['String'];
};

export enum AccountRegisterErrorCode {
  UsernameTaken = 'USERNAME_TAKEN'
}

export type AccountRegisterInput = {
  birthdate: Scalars['DateTime'];
  customGender?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  gender: Gender;
  lastName: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  pronoun: Pronoun;
  username: Scalars['String'];
};

export type Feed = {
  __typename?: 'Feed';
  error?: Maybe<PostError>;
  feed?: Maybe<PostConnection>;
};

export enum Gender {
  Custom = 'CUSTOM',
  Female = 'FEMALE',
  Male = 'MALE'
}

export type Me = {
  __typename?: 'Me';
  error?: Maybe<UserError>;
  me?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  accountRegister: AccountRegister;
  postCreate: PostCreate;
  tokenCreate: TokenCreate;
};

export type MutationAccountRegisterArgs = {
  input: AccountRegisterInput;
};

export type MutationPostCreateArgs = {
  input: PostCreateInput;
};

export type MutationTokenCreateArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

/** Information about pagination in a connection */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['UUID'];
  scope: Scope;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type PostConnection = {
  __typename?: 'PostConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<PostEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total result set count */
  totalCount: Scalars['Int'];
};

export type PostCreate = {
  __typename?: 'PostCreate';
  error?: Maybe<PostError>;
  post?: Maybe<Post>;
};

export type PostCreateInput = {
  content: Scalars['String'];
  scope: Scope;
};

/** An edge in a connection. */
export type PostEdge = {
  __typename?: 'PostEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: Post;
};

export type PostError = {
  __typename?: 'PostError';
  code: PostErrorCode;
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export enum PostErrorCode {
  Unauthorized = 'UNAUTHORIZED'
}

export type Posts = {
  __typename?: 'Posts';
  error?: Maybe<PostError>;
  posts?: Maybe<PostConnection>;
};

export enum Pronoun {
  He = 'HE',
  She = 'SHE',
  They = 'THEY'
}

export type Query = {
  __typename?: 'Query';
  feed: Feed;
  me: Me;
  posts: Posts;
  users: Users;
};

export type QueryFeedArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<UsersFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export enum Scope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type TokenCreate = {
  __typename?: 'TokenCreate';
  error?: Maybe<TokenCreateError>;
  tokens?: Maybe<Tokens>;
};

export type TokenCreateError = {
  __typename?: 'TokenCreateError';
  code: TokenCreateErrorCode;
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export enum TokenCreateErrorCode {
  InvalidCredentials = 'INVALID_CREDENTIALS'
}

export type Tokens = {
  __typename?: 'Tokens';
  accessToken: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  birthdate: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  customGender?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  gender: Gender;
  id: Scalars['UUID'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  pronoun: Pronoun;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total result set count */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node: User;
};

export type UserError = {
  __typename?: 'UserError';
  code: UserErrorCode;
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export enum UserErrorCode {
  Unauthorized = 'UNAUTHORIZED'
}

export type Users = {
  __typename?: 'Users';
  error?: Maybe<UserError>;
  users?: Maybe<UserConnection>;
};

export type UsersFilter = {
  username?: InputMaybe<Scalars['String']>;
};

export type TokenCreateErrorFragmentFragment = {
  __typename?: 'TokenCreateError';
  code: TokenCreateErrorCode;
  field?: string | null;
  message?: string | null;
};

export type TokensFragmentFragment = { __typename?: 'Tokens'; accessToken: string };

export type TokenCreateMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;

export type TokenCreateMutation = {
  __typename?: 'Mutation';
  tokenCreate: {
    __typename?: 'TokenCreate';
    tokens?: { __typename?: 'Tokens'; accessToken: string } | null;
    error?: {
      __typename?: 'TokenCreateError';
      code: TokenCreateErrorCode;
      field?: string | null;
      message?: string | null;
    } | null;
  };
};

export type PostErrorFragmentFragment = {
  __typename?: 'PostError';
  code: PostErrorCode;
  field?: string | null;
  message?: string | null;
};

export type PostFragmentFragment = {
  __typename?: 'Post';
  id: any;
  content: string;
  scope: Scope;
  createdAt: any;
  updatedAt: any;
  user: {
    __typename?: 'User';
    id: any;
    name: string;
    lastName: string;
    email: string;
    username: string;
    birthdate: any;
    gender: Gender;
    pronoun: Pronoun;
    customGender?: string | null;
    createdAt: any;
    updatedAt: any;
  };
};

export type CreatePostMutationVariables = Exact<{
  input: PostCreateInput;
}>;

export type CreatePostMutation = {
  __typename?: 'Mutation';
  postCreate: {
    __typename?: 'PostCreate';
    post?: {
      __typename?: 'Post';
      id: any;
      content: string;
      scope: Scope;
      createdAt: any;
      updatedAt: any;
      user: {
        __typename?: 'User';
        id: any;
        name: string;
        lastName: string;
        email: string;
        username: string;
        birthdate: any;
        gender: Gender;
        pronoun: Pronoun;
        customGender?: string | null;
        createdAt: any;
        updatedAt: any;
      };
    } | null;
    error?: {
      __typename?: 'PostError';
      code: PostErrorCode;
      field?: string | null;
      message?: string | null;
    } | null;
  };
};

export type FeedQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
}>;

export type FeedQuery = {
  __typename?: 'Query';
  feed: {
    __typename?: 'Feed';
    feed?: {
      __typename?: 'PostConnection';
      edges?: Array<{
        __typename?: 'PostEdge';
        node: {
          __typename?: 'Post';
          id: any;
          content: string;
          scope: Scope;
          createdAt: any;
          updatedAt: any;
          user: {
            __typename?: 'User';
            id: any;
            name: string;
            lastName: string;
            email: string;
            username: string;
            birthdate: any;
            gender: Gender;
            pronoun: Pronoun;
            customGender?: string | null;
            createdAt: any;
            updatedAt: any;
          };
        };
      } | null> | null;
    } | null;
    error?: {
      __typename?: 'PostError';
      code: PostErrorCode;
      field?: string | null;
      message?: string | null;
    } | null;
  };
};

export type AccountRegisterErrorFragmentFragment = {
  __typename?: 'AccountRegisterError';
  code: AccountRegisterErrorCode;
  field: string;
  message: string;
};

export type UserErrorFragmentFragment = {
  __typename?: 'UserError';
  code: UserErrorCode;
  field?: string | null;
  message?: string | null;
};

export type UserFragmentFragment = {
  __typename?: 'User';
  id: any;
  name: string;
  lastName: string;
  email: string;
  username: string;
  birthdate: any;
  gender: Gender;
  pronoun: Pronoun;
  customGender?: string | null;
  createdAt: any;
  updatedAt: any;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me: {
    __typename?: 'Me';
    me?: {
      __typename?: 'User';
      id: any;
      name: string;
      lastName: string;
      email: string;
      username: string;
      birthdate: any;
      gender: Gender;
      pronoun: Pronoun;
      customGender?: string | null;
      createdAt: any;
      updatedAt: any;
    } | null;
    error?: {
      __typename?: 'UserError';
      code: UserErrorCode;
      field?: string | null;
      message?: string | null;
    } | null;
  };
};

export type AccountRegisterMutationVariables = Exact<{
  input: AccountRegisterInput;
}>;

export type AccountRegisterMutation = {
  __typename?: 'Mutation';
  accountRegister: {
    __typename?: 'AccountRegister';
    user?: {
      __typename?: 'User';
      id: any;
      name: string;
      lastName: string;
      email: string;
      username: string;
      birthdate: any;
      gender: Gender;
      pronoun: Pronoun;
      customGender?: string | null;
      createdAt: any;
      updatedAt: any;
    } | null;
    error?: {
      __typename?: 'AccountRegisterError';
      code: AccountRegisterErrorCode;
      field: string;
      message: string;
    } | null;
  };
};

export const TokenCreateErrorFragmentFragmentDoc = gql`
  fragment TokenCreateErrorFragment on TokenCreateError {
    code
    field
    message
  }
`;
export const TokensFragmentFragmentDoc = gql`
  fragment TokensFragment on Tokens {
    accessToken
  }
`;
export const PostErrorFragmentFragmentDoc = gql`
  fragment PostErrorFragment on PostError {
    code
    field
    message
  }
`;
export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on User {
    id
    name
    lastName
    email
    username
    birthdate
    gender
    pronoun
    customGender
    createdAt
    updatedAt
  }
`;
export const PostFragmentFragmentDoc = gql`
  fragment PostFragment on Post {
    id
    content
    user {
      ...UserFragment
    }
    scope
    createdAt
    updatedAt
  }
  ${UserFragmentFragmentDoc}
`;
export const AccountRegisterErrorFragmentFragmentDoc = gql`
  fragment AccountRegisterErrorFragment on AccountRegisterError {
    code
    field
    message
  }
`;
export const UserErrorFragmentFragmentDoc = gql`
  fragment UserErrorFragment on UserError {
    code
    field
    message
  }
`;
export const TokenCreateDocument = gql`
  mutation TokenCreate($username: String!, $password: String!) {
    tokenCreate(username: $username, password: $password) {
      tokens {
        ...TokensFragment
      }
      error {
        ...TokenCreateErrorFragment
      }
    }
  }
  ${TokensFragmentFragmentDoc}
  ${TokenCreateErrorFragmentFragmentDoc}
`;

export function useTokenCreateMutation() {
  return Urql.useMutation<TokenCreateMutation, TokenCreateMutationVariables>(TokenCreateDocument);
}
export const CreatePostDocument = gql`
  mutation CreatePost($input: PostCreateInput!) {
    postCreate(input: $input) {
      post {
        ...PostFragment
      }
      error {
        ...PostErrorFragment
      }
    }
  }
  ${PostFragmentFragmentDoc}
  ${PostErrorFragmentFragmentDoc}
`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
}
export const FeedDocument = gql`
  query Feed($first: Int) {
    feed(first: $first) {
      feed {
        edges {
          node {
            ...PostFragment
          }
        }
      }
      error {
        ...PostErrorFragment
      }
    }
  }
  ${PostFragmentFragmentDoc}
  ${PostErrorFragmentFragmentDoc}
`;

export function useFeedQuery(options?: Omit<Urql.UseQueryArgs<FeedQueryVariables>, 'query'>) {
  return Urql.useQuery<FeedQuery>({ query: FeedDocument, ...options });
}
export const MeDocument = gql`
  query Me {
    me {
      me {
        ...UserFragment
      }
      error {
        ...UserErrorFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
  ${UserErrorFragmentFragmentDoc}
`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
export const AccountRegisterDocument = gql`
  mutation AccountRegister($input: AccountRegisterInput!) {
    accountRegister(input: $input) {
      user {
        ...UserFragment
      }
      error {
        ...AccountRegisterErrorFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
  ${AccountRegisterErrorFragmentFragmentDoc}
`;

export function useAccountRegisterMutation() {
  return Urql.useMutation<AccountRegisterMutation, AccountRegisterMutationVariables>(
    AccountRegisterDocument
  );
}
