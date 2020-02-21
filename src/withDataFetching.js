import React from 'react';

// This function takes a component...
export default function withDataFetching(WrappedComponent) {
    // ...and returns another component...
    class withDataFetching extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: [],
                loading: true
            };
        }

        async componentDidMount() {
            try {
                const data = await fetch(this.props.dataSource);
                const dataJSON = await data.json();

                if (dataJSON) {
                    this.setState({
                        data: dataJSON,
                        loading: false
                    })
                }
            } catch (error) {
                this.setState({
                    loading: error.message
                })
            }
        }

        render() {
            const { data, loading } = this.state;

            // ... and renders the wrapped component with the fresh data!
            // Notice that we pass through any additional props
            return <WrappedComponent data={data} loading={loading} {...this.props} />;
        }
    };

    withDataFetching.displayName = `WithDataFetching(${WrappedComponent.name})`;

    return withDataFetching;
}