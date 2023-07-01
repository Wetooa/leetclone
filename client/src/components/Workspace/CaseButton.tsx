interface CaseButtonProps {
	name: string;
}

export default function CaseButton({ name }: CaseButtonProps) {
	return (
		<div className="mr-2 items-start mt-2 text-white">
			<div className="flex flex-wrap items-center gap-y-4">
				<div className="font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap">
					{name}
				</div>
			</div>
		</div>
	);
}
