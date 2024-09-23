function saveContacts(id, operation) {
	if (operation == "insert")
		return webix.ajax().post("http://localhost:8096/api/v1/contacts/" + id);
	if (operation == "update")
		return webix.ajax().put("http://localhost:8096/api/v1/statuses/" + id);
	if (operation == "delete")
		return webix.ajax().del("http://localhost:8096/api/v1/contacts/" + id);
}

function saveStatuses(id, operation) {
	if (operation == "insert")
		return webix.ajax().post("http://localhost:8096/api/v1/statuses/" + id);
	if (operation == "update")
		return webix.ajax().put("http://localhost:8096/api/v1/statuses/" + id);
	if (operation == "delete")
		return webix.ajax().del("http://localhost:8096/api/v1/statuses/" + id);
}

function saveCountries(id, operation) {
	if (operation == "insert")
		return webix.ajax().post("http://localhost:8096/api/v1/statuses/" + id);
	if (operation == "update")
		return webix.ajax().put("http://localhost:8096/api/v1/statuses/" + id);
	if (operation == "delete")
		return webix.ajax().del("http://localhost:8096/api/v1/statuses/" + id);
}


export { saveContacts, saveStatuses, saveCountries }