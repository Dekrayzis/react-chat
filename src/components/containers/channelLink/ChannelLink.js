import React, { useEffect, useState } from "react";
import moment from "moment";

import { Avatar } from "./../../elements";
import db from "../../../firebase";
import { useStateValue } from "../../../context/StateProvider";

import "./channelLink.scss";

const ChannelLink = ({ channelId, info, status, isUser, directMsg }) => {
  const [, dispatch] = useStateValue();
  const [messages, setMessages] = useState([]);
  const [channelInfo, setChannelInfo] = useState(null);

  useEffect(() => {
    const docRef = db.collection("rooms").doc(channelId);

    if (channelId) {
      docRef.onSnapshot((snapShot) => setChannelInfo(snapShot.data()));

      docRef
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapShot) =>
          setMessages((prevState) => snapShot.docs.map((doc) => doc.data()))
        );

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const storedDate = moment(doc.data().storedTimestamp);
            const nowDate = moment();
            //get the difference in days, for example
            console.log(nowDate.diff(storedDate, "days"));
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  }, [channelId]);

  const openChat = () => {
    const channel = {
      ...channelInfo,
      id: channelId,
    };

    dispatch({
      type: "SET_CURRENT_CHANNEL",
      currentChannel: channel,
    });
  };

  return (
    <div className="channel_link" onClick={isUser ? directMsg : openChat}>
      <div className="channel_link_left">
        <Avatar avatar="http://placehold.it/40x40" />
        <div className="channel_link_info">
          <h3 className="channel_link_name">{info.name}</h3>
          <p className="channel_link_msg">
            Last message...
            {/* {moment(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()} */}
          </p>
        </div>
      </div>
      <div className="channel_link__right">
        {info.user ? (
          <div className={`userStatus status-${info.status}`}>
            {info.status}
          </div>
        ) : (
          <div className="channel_link__info">
            {info.notifications ? (
              <div className="notification">
                <span className="count">2</span>
              </div>
            ) : null}
            <span className="timestamp">
              {moment(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).format("HH:mm")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelLink;
