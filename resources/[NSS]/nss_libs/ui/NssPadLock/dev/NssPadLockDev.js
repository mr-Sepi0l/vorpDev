import {NssPadLock} from "../NssPadLock.js";

const createNssPadLockDev = () => {

    const nssPadLockDemo = new NssPadLock('1001');

    nssPadLockDemo.setAudioPath('../sounds/');

    nssPadLockDemo.setTimePenalty(250);

// nssPadLockDemo.setClosable();

    nssPadLockDemo.onNewCode((code) => {
        console.log(code);
    });

    nssPadLockDemo.onOpen((padlock) => {
        padlock.hide().then(() => {
            padlock.reset();
            // padlock.show();

            window.setTimeout(() => {
                padlock.show();
            }, 500);
        });
    });

    // nssPadLockDemo.enableCache('my_pad', 2000);

    nssPadLockDemo.show();

    return nssPadLockDemo;
};

createNssPadLockDev();