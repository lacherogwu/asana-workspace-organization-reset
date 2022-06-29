const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
async function removeAllMembers() {
	const dropdownEls = document.querySelectorAll('.OrgMembersListMemberRowDropdown');

	for (let i = 0; i < dropdownEls.length; i++) {
		const element = dropdownEls[i];

		// open dropdown
		element.click();
		await sleep(500);

		const removeBtn = document.querySelector('.AdminConsoleMembersListRemoveMemberMenuItem-memberActionRemove');
		if (!removeBtn) {
			// close dropdown
			element.click();
			continue;
		}

		removeBtn.click();
		await sleep(500);

		// uncheck checkbox
		document.querySelector('.CheckboxWithLabel-input--alignTop').click();
		await sleep(500);

		// remove member
		document.querySelector('.ModalFooter-button.DangerButton').click();
		await sleep(1000);
	}
}

removeAllMembers();
