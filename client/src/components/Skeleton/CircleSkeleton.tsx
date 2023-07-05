interface CircleSkeletonProps {}

export default function CircleSkeleton({}: CircleSkeletonProps) {
	return (
		<div className="space-y-2.5 animate-pulse">
			<div className="flex items-center w-full space-x-2">
				<div className="h-6 w-6 rounded-full bg-dark-fill-3" />
			</div>
		</div>
	);
}
