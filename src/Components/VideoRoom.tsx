import React from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

const APP_ID = "b5be6faecedc4d5bb214845f51a8e14d";
const TOKEN =
	"007eJxTYJCZ/mBFe7HDiXCRrUInihruyi5edfi75Zxly50EeI2FxQMVGJJMk1LN0hJTk1NTkk1STJOSjAxNLExM00wNEy1SDU1Svh85ndwQyMiQwRPIxMgAgSA+O0NZsm5JanEJAwMAoLggag==";
const CHANNEL = "vc-test";

const VideoRoom: React.FC<{}> = () => {
	const client = AgoraRTC.createClient({
		mode: "rtc",
		codec: "vp8",
	});

	const [users, setUsers] = React.useState<any>([]);
	const [localTracks, setLocalTracks] = React.useState<any>([]);

	// const handleUserJoined = async (user: any, mediaType: any) => {
	// 	await client.subscribe(user, mediaType);
	// 	console.log("i have joined", user);

	// 	if (mediaType === "video") {
	// 		setUsers((previousUsers: any) => [...previousUsers, user]);
	// 	}

	// 	if (mediaType === "audio") {
	// 		// user.audioTrack.play()
	// 	}
	// };

	// const handleUserLeft = (user: any) => {
	// 	setUsers((previousUsers: any) =>
	// 		previousUsers.filter((u: any) => u.uid !== user.uid)
	// 	);
	// };

	React.useEffect(() => {
		// client.on("user-published", handleUserJoined);
		// client.on("user-left", handleUserLeft);

		client
			.join(APP_ID, CHANNEL, TOKEN, null)
			.then((uid) =>
				Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
			)
			.then(([tracks, uid]) => {
				const [audioTrack, videoTrack] = tracks;
				setLocalTracks(tracks);
				setUsers((previousUsers: any) => [
					...previousUsers,
					{
						uid,
						videoTrack,
						audioTrack,
					},
				]);
				client.publish(tracks);
			});

		return () => {
			for (let localTrack of localTracks) {
				localTrack.stop();
				localTrack.close();
			}
			// client.off("user-published", handleUserJoined);
			// client.off("user-left", handleUserLeft);
			// client.unpublish(localTracks).then(() => client.leave());
		};
	}, []);

	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(2, 200px)",
				}}>
				{users.map(
					(user: any) => console.log("user", user)
					// <VideoPlayer key={user.uid} user={user} />
				)}
			</div>
		</div>
	);
};

export { VideoRoom };
