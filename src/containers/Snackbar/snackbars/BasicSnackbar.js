import React from 'react';
import styled from 'styled-components';
import Animated from 'animated/lib/targets/react-dom';

// Components //
import Text from 'components/Text';

const Root = styled(({ hasLink, ...props }) => <Animated.div {...props} />)`
    
`;

const BasicSnackbar = ({ color, data, onClose, theme }) => (
    <Root color={data.isError ? 'error' : color}>
        <Text color='white' paragraph>
            {data.text}
        </Text>
    </Root>
);

BasicSnackbar.defaultProps = {
    color: 'gray',
};

export default BasicSnackbar;
