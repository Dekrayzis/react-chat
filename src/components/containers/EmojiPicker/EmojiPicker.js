import React, { useState } from "react";
import { Picker, emojiIndex } from "emoji-mart";

//-- Styles
import "emoji-mart/css/emoji-mart.css";

const EmojiPicker = ({ currentMsg, updateMessage, showEmojiWindow }) => {
  const handleAddEmoji = (emoji) => {
    // const oldMessage = currentMsg;
    const newMessage = colonToUnicode(`${currentMsg} ${emoji.colons}`);

    updateMessage(newMessage);
  };

  const colonToUnicode = (message) => {
    return message.replace(/:[A-Za-z0-9_+-]+:/g, (x) => {
      x = x.replace(/:/g, "");
      let emoji = emojiIndex.emojis[x];

      if (typeof emoji !== "undefined") {
        let unicode = emoji.native;
        if (typeof unicode !== "undefined") {
          return unicode;
        }
      }
      x = ":" + x + ":";
      return x;
    });
  };

  return (
    <>
      {showEmojiWindow && (
        <Picker
          set="apple"
          onSelect={handleAddEmoji}
          className="emojipicker"
          title="Choose emoji"
          emoji="point_up"
        />
      )}
    </>
  );
};

export default EmojiPicker;
