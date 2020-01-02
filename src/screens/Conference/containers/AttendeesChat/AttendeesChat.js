import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Animated from 'animated/lib/targets/react-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
// Redux //
import { toggleAttendeesChat, setUnreadCount } from 'data/chat/actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser, makeSelectStreamToken } from 'data/auth/selectors';
// import { ReactSlackChat } from '../../../../build/static/js/local-dev-ReactSlackChat.4f76bd62.chunk.js.map';
import { ReactSlackChat } from '../../../../react-slack-chat/src/components/ReactSlackChat/index';

// Components //
import Portal from 'utils/Portal';
import ChatHeader from './ChatHeader';
const Root = styled(Animated.div)`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    max-width: 376px;
    width: 100%;
    background-color: ${({ theme }) => theme.color.trueblack};
`;
class AttendeesChat extends Component {
    anim = new Animated.Value(0);
    constructor(props) {
        super(props);
        // this.chatClient = new StreamChat("4c72skfjcnk6");
        this.state = {
            channel: null,
            unmount: true,
        };
    }
    async componentDidMount() {
        // const { match, user, streamToken } = this.props;
        // await this.chatClient.setUser(user, streamToken);
        // const channel = await this.chatClient.channel('messaging', match.params.conferenceAlias, {
        //     name: 'Video Call',
        // });
        // await this.setState({
        //     channel,
        // });
    }
    async componentDidUpdate(prevProps, prevState) {
        const { attendeesChatOpened, setUnreadCount } = this.props;
        // const { channel } = this.state;
        // if (!prevState.channel && channel) {
        //     this.init();
        // }
        if (!prevProps.attendeesChatOpened && attendeesChatOpened) {
            await this.setState({ unmount: false });
            setUnreadCount(0);
            document.body.classList.add('chat-open');
            Animated.timing(this.anim, {
                toValue: 1,
                duration: 250,
            }).start();
        } else if (prevProps.attendeesChatOpened && !attendeesChatOpened) {
            document.body.classList.remove('chat-open');
            Animated.timing(this.anim, {
                toValue: 0,
                duration: 250,
            }).start(() => {
                this.setState({
                    unmount: true,
                });
            });
        }
    }
    async init() {
        // const { channel } = this.state;
        // await channel.watch();
        // channel.on('message.new', this.handleNewMessage);
    }
    handleNewMessage = async () => {
        const { attendeesChatOpened, setUnreadCount } = this.props;
        const { channel } = this.state;
        const unread = await channel.countUnread();
        setUnreadCount(attendeesChatOpened ? 0 : unread);
    };
    get rootStyle() {
        return {
            transform: [
                {
                    translateX: this.anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['100%', '0%'],
                    }),
                },
            ],
        };
    }
    render() {
        const { toggleAttendeesChat } = this.props;
        const { unmount } = this.state;
        // if (!channel || unmount) {
        //     return null;
        // }
        return (
            <Portal>
                {!unmount && <Root style={this.rootStyle}>
                <ReactSlackChat
                botName={this.props.currentUser.name}
                apiToken='eG94Yi0yMjI2MDgxNzAwNTItODczNTE0ODU0MzcwLVJlbHJKN2FRWkdXNmltd090TlFaMFFDcQ=='
                channels={[{
                  name: 'test-real-chat',
                  id: 'CRS1JJ1NV',
                  icon: ''
                }]}
                userImage='http://www.iconshock.com/img_vista/FLAT/mail/jpg/robot_icon.jpg'
                debugMode={true}
              />
                </Root>}
            </Portal>
        );
    }
}
const mapStateToProps = createStructuredSelector({
    user: makeSelectCurrentUser(),
    streamToken: makeSelectStreamToken(),
});
export default compose(
    connect(
        mapStateToProps,
        { toggleAttendeesChat, setUnreadCount },
    ),
    withRouter,
)(AttendeesChat);