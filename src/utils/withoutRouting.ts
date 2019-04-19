import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export function withoutRouteProps<P>(
  Component: React.ComponentClass<P> | React.SFC<P>
): React.ComponentClass<RouteComponentProps<P>> {
  class C extends React.Component<RouteComponentProps<P>, {}> {
    public render(): JSX.Element | any {
      // const { match, location, history, staticContext, ...rest } = this.props;
      // return <Component {...rest} />;
    }
  }
  return C;
}

export default withoutRouteProps;
