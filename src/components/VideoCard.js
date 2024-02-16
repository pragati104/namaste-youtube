const VideoCard = ({ info }) => {
  // console.log(info);
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;
  return (
    <div className="p-2 m-2 w-80 shadow-lg">
      <img
        className="rounded-lg"
        alt="youtube-videos"
        src={thumbnails.medium.url}
      />
      <ul>
        <li className="font-bold">{title}</li>
        <li className="">{channelTitle}</li>
        <li className="font-semibold">{statistics.viewCount} views</li>
      </ul>
    </div>
  );
};

export default VideoCard;
