$(document).ready(function(){
  var getAndDisplayAllTasks = function () {
    $.ajax({
      type: 'GET',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=159',
      dataType: 'json',
      success: function (response, textStatus) {
        $('.list-group').empty();
        response.tasks.forEach(function (task) {
          $(".list-group").append(`<li class="list-group-item">
      <input
        class="form-check-input rounded-circle me-1"
        id="${task.id}"
        type="checkbox"
        value=""
        data-id="${task.id}"
        ${task.completed ? "checked" : ""}
      />
      <label class="form-check-label pt-2" for="${
        task.id
      }">${task.content}</label>
      <button class="btn btn-sm mt-2 mt-sm-3;  remove-item border" data-id="${
        task.id
      }">Remove</button>
    </li>`);
        });
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };
  
  var createTask = function () {
    $.ajax({
      type: 'POST',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=159',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#new-task-content').val()
        }
      }),
      success: function (response, textStatus) {
        $('#new-task-content').val('');
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });  
  }
  
  $('#create-task').on('submit', function (e) {
    e.preventDefault();
    createTask();
  });

  var deleteTask = function (id) {
    $.ajax({
      type: 'DELETE',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=159',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $(document).on('click', ".remove-item", function () {
    deleteTask($(this).data('id'));
  });

  var markTaskComplete = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=159',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  var markTaskActive = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=159',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  //ACTIVE tasks
  $(".toggle-active").on("click", function () {
    $(".list-group-item").each(function (i, ele) {
      if ($(this).find(".form-check-input").prop("checked")) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });;
  });

  //COMPLETED tasks
  $(".toggle-completed").on("click", function () {
    $(".list-group-item").each(function (i, ele) {
      if ($(this).find(".form-check-input").prop("checked") !== true) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  });

  //All tasks
  $(".toggle-all").on("click", function () {
    $(".list-group-item").each(function (i, ele) {
      $(this).show();
    });
  });

  $(document).on('change', '.form-check-input', function () {
    if (this.checked) {
      markTaskComplete($(this).data('id'));
    } else {
      markTaskActive($(this).data('id'));
    }
  });

  getAndDisplayAllTasks();
});

