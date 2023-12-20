$(document).ready(function () {
    $("#addMedicineForm").submit(function (event) {
        $("#error-message").text("");
        event.preventDefault();

        var formData = {
            MedicineName: $("#medicineName").val(),
            medicine_type: $("#medicineType").val(),
            Composition: $("#composition").val(),
            Uses: $("#uses").val(),
            Side_effects: $("#sideEffects").val(),
            Manufacturer: $("#manufacturer").val(),
            Price: $("#price").val(),
            Quantity: $("#quantity").val()
        };

        console.log(formData);
        $.ajax({
            type: "POST",
            url: "/admin/addMedicine",
            data: formData,
            success: function (response) {
                $("#medicineTable").html(response);

                $("#addMedicineForm")[0].reset();

                $("#error-message")
                .text("Added Medicine Successfully!")
                .css("color", "green");
            },
            error: function (error) {
                $("#error-message")
                .text("Failed to add medicine. Please try again.")
            }
        });
    });

    $("#option-name").on("blur", function () {
        const $optionInput = $(this);
        $optionInput.prop("disabled", true).addClass("locked-input");
    
        const optionName = $optionInput.val();
    
        $.ajax({
            type: "POST",
            url: "/admin/addOption",
            data: { option_name: optionName },
            success: function (response) {
                $("#optionResult").text(`Option ID: ${response.optionId}`);
                $("#option-id").val(response.optionId).prop("disabled", true).addClass("locked-input");
                console.log(response);
            },
            error: function (error) {
                console.error("Error:", error);
            }
        });
    });
    $("#addMedicineOption").on("submit", function (event) {
        event.preventDefault();

        const medId = $("#med-id").val();
        const optionId = $("#option-id").val();
        const optionValue = $("#option-value").val();
    
        $.ajax({
            type: "POST",
            url: "/admin/addValue",
            data: {
                med_id: medId,
                option_id: optionId,
                option_value: optionValue
            },
            success: function (response) {
                $("#error-message-option")
                .text("Added Value Successfully")
                .css("color", "green");
            },
            error: function (error) {
                $("#error-message-option")
                .text(error)
            }
        });
    });
    
});
