import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
console.log(iframe);
const player = new Player(iframe);

const getCurrentTime = function (currentTime) {
  const seconds = currentTime.seconds;
  localStorage.setItem('videoplayer-current-time', JSON.stringify(seconds));
};

player.on('timeupdate', throttle(getCurrentTime, 1000));

player.setCurrentTime(
  JSON.parse(localStorage.getItem('videoplayer-current-time'))
);
